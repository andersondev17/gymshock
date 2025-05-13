// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true, // ✅ Permite múltiples null para usuarios OAuth
        trim: true,
        lowercase: true,
        minlength: [3, 'Username debe tener al menos 3 caracteres'],
        maxlength: [30, 'Username no puede exceder 30 caracteres'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username solo puede contener letras, números y guiones bajos']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Email debe tener un formato válido'
        ]
    },
    password: {
        type: String,
        required: function () {
            // Solo es requerida si NO es usuario OAuth
            return !this.googleId && this.provider === 'local';
        },
        minlength: [6, 'Contraseña debe tener al menos 6 caracteres'],
        select: false // No incluir en queries por defecto por seguridad
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'Nombre no puede exceder 50 caracteres']
    },
    image: {
        type: String,
        default: ''
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    role: {
        type: String,
        enum: ['admin', 'trainer', 'user'], // Valores fijos
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    isEmailVerified: {
        type: Boolean,
        default: function () {
            // Usuarios OAuth tienen email verificado automáticamente
            return this.provider === 'google';
        }
    },
    // Métricas de uso
    lastLogin: {
        type: Date,
        default: Date.now
    },

    loginCount: {
        type: Number,
        default: 0
    },
    // Tokens y verificación (solo para usuarios locales)
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date

}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            // Eliminar campos sensibles del JSON response
            delete ret.password;
            delete ret.__v;
            delete ret.emailVerificationToken;
            delete ret.passwordResetToken;
            delete ret.passwordResetExpires;
            return ret;
        }
    }
});

// Método para encriptar contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    // Solo hashear si la contraseña fue modificada y existe
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    try {
        console.log('🔐 Hasheando contraseña para:', this.email);
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error('❌ Error hasheando contraseña:', error);
        next(error);
    }
});
UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.loginCount = 0;
        this.lastLogin = new Date();

        // Auto-generar username para usuarios OAuth si no existe
        if (!this.username && this.email) {
            this.username = this.email.split('@')[0].toLowerCase();
        }
    }
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) {
        throw new Error('Usuario OAuth no tiene contraseña local configurada');
    }
    return await bcrypt.compare(candidatePassword, this.password);
};

// 👑 Método para verificar si es administrador
UserSchema.methods.isAdmin = function () {
    return this.role === 'admin';
};
UserSchema.methods.updateLastLogin = async function () {
    this.lastLogin = new Date();
    this.loginCount += 1;
    return await this.save();
};
UserSchema.methods.getAvatarUrl = function () {
    if (this.image) {
        return this.image;
    }

    // Fallback a Gravatar
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(this.email.toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=150`;
};

UserSchema.statics.createOAuthUser = async function (profile, provider = 'google') {
    const email = profile.emails?.[0]?.value;
    if (!email) {
        throw new Error('Email no disponible en el perfil OAuth');
    }

    // Generar username único
    let username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');
    let counter = 1;

    while (await this.findOne({ username })) {
        username = `${email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '')}${counter}`;
        counter++;
        if (counter > 999) {
            username = `${email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '')}_${Date.now()}`;
            break;
        }
    }

    const userData = {
        email,
        name: profile.displayName || profile.name?.givenName || 'Usuario',
        username,
        provider,
        isEmailVerified: true,
        image: profile.photos?.[0]?.value || ''
    };

    // Agregar ID específico del proveedor
    if (provider === 'google') {
        userData.googleId = profile.id;
    }

    return await this.create(userData);
};

module.exports = mongoose.model('User', UserSchema);