import { cn } from "@/lib/utils";

export function LogoMark({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", className)}
      {...props}
    >
      <path d="M0 0H24C28.4183 0 32 3.58172 32 8V32H0V0Z" fill="var(--highlight)" />
      <path
        d="M11.224 21V12.056C11.224 11.7253 11.128 11.4693 10.936 11.288C10.7547 11.096 10.4987 11 10.168 11H8.216V9.64H10.344C11.1653 9.64 11.784 9.85333 12.2 10.28C12.6267 10.696 12.84 11.3147 12.84 12.136V21H11.224ZM7.896 21V19.64H15.704V21H7.896ZM17.8098 22.472V21H24.9778V22.472H17.8098Z"
        fill="var(--highlight-foreground)"
      />
    </svg>
  );
}
