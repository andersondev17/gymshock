import Image from 'next/image';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='auth-container'>
            <section className='auth-form'>
                <div className='auth-box'>
                    <div className='flex flex-row gap-3'>
                        <Image src='/assets/images/Logo.png' alt='logo' width={37} height={37} />
                        <h1 className='text-lg font-semibold text-white max-w-2xl'>  GymShock </h1>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </section>
            <section className='auth-illustration'>
                <Image src='/assets/images/banner.png' alt='auth illustration' height={1000} width={1000} className='size-full object-cover' />

            </section>
        </main>
    )
}

export default layout;