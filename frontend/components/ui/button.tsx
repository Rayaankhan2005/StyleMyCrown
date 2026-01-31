import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] duration-200"
    
    const variants = {
      primary: "bg-blue-600/80 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 backdrop-blur-sm hover:shadow-blue-500/40",
      outline: "border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:border-white/40",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      glass: "glass text-white hover:bg-white/20 hover:border-white/40 shadow-lg"
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
