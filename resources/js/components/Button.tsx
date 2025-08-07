import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Asumsikan kamu punya helper 'cn' dari shadcn

// 1. Definisikan semua variasi styling tombol di sini
const buttonVariants = cva(
    // Kelas dasar yang dimiliki semua tombol
    'w-fit inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            // Definisikan variasi tampilan
            variant: {
                normal: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
            },
            // Definisikan variasi ukuran
            size: {
                normal: 'h-10 py-2 px-4',
                small: 'h-9 rounded-md px-3',
            },
        },
        // Atur nilai default jika tidak ditentukan
        defaultVariants: {
            variant: 'normal',
            size: 'normal',
        },
    }
);

// 2. Definisikan tipe props untuk komponen Button
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

// 3. Buat komponen Button-nya
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
