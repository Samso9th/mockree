import {
    AlertTriangle,
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    FileText,
    HelpCircle,
    Image,
    Laptop,
    Loader2,
    LucideIcon,
    LucideProps,
    Moon,
    MoreVertical,
    Plus,
    Puzzle,
    Search,
    Settings,
    SunMedium,
    Trash,
    User,
    X,
  } from "lucide-react";
  
  export type Icon = LucideIcon;
  
  export const Icons = {
    add: Plus,
    arrowRight: ArrowRight,
    arrowUpRight: ArrowUpRight,
    billing: CreditCard,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    check: Check,
    close: X,
    copy: Copy,
    ellipsis: MoreVertical,
    gitHub: ({ ...props }: LucideProps) => (
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="github"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
        {...props}
      >
        <path
          fill="currentColor"
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        ></path>
      </svg>
    ),
    google: ({ ...props }: LucideProps) => (
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
        {...props}
      >
        <path
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          fill="currentColor"
        />
      </svg>
    ),
    nextjs: ({ ...props }: LucideProps) => (
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="nextjs"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
        {...props}
      >
        <path
          fill="currentColor"
          d="m4.5 4.5l.405-.293A.5.5 0 0 0 4 4.5zm3 9.5A6.5 6.5 0 0 1 1 7.5H0A7.5 7.5 0 0 0 7.5 15zM14 7.5A6.5 6.5 0 0 1 7.5 14v1A7.5 7.5 0 0 0 15 7.5zM7.5 1A6.5 6.5 0 0 1 14 7.5h1A7.5 7.5 0 0 0 7.5 0zm0-1A7.5 7.5 0 0 0 0 7.5h1A6.5 6.5 0 0 1 7.5 1zM5 12V4.5H4V12zm-.905-7.207l6.5 9l.81-.586l-6.5-9zM10 4v6h1V4z"
        ></path>
      </svg>
    ),
    help: HelpCircle,
    laptop: Laptop,
    logo: ({ ...props }: LucideProps) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 852 1136"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path transform="translate(722,3)" d="m0 0h126l1 1v1128h-844l-1-1v-1119l1-8zm-303 135-17 3-12 4-14 7-13 10-10 10-10 15-7 16-4 15-1 7v19l3 15 5 14 8 15 11 13 11 10 13 8 14 6 15 4h30l16-4 15-6 15-10 9-8v-2h2l10-14 8-15 4-13 2-11v-25l-3-14-5-13-7-13-8-10-7-8-15-11-16-8-13-4-12-2zm6 206-21 1-25 4-23 6-21 8-16 8-17 10-14 10-11 9-13 12-12 13-13 17-10 16-12 23-8 21-6 23-4 27-1 20 1 1 139 1h164l152-1 1-1v-14l-3-24-5-23-8-24-8-18-8-14-9-14-11-14-10-11-7-8-8-7-16-13-15-10-16-9-20-9-21-7-21-5-23-3zm-33 397-287 1-7 2-8 7-4 8-1 9 3 12 6 7 9 4 169 1h297l180-1 10-5 7-8 2-6v-11l-4-9-4-5-8-4-5-1-267-1zm-286 190-9 3-8 7-3 8v14l4 8 8 7 12 3h631l12-2 6-4 6-7 3-8v-10l-4-9-7-7-4-2-6-1z" fill="#1E4D84"/>
        <path transform="translate(166,792)" d="m0 0h570v1l-8 1h-4l-2 1h-525v-1l-31-1z" fill="#123D78"/>
        <path transform="translate(761,4)" d="m0 0h87l-1 4-2 1-3-2-231-1v-1z" fill="#14417B"/>
      </svg>
    ),
    media: Image,
    moon: Moon,
    page: File,
    post: FileText,
    search: Search,
    settings: Settings,
    spinner: Loader2,
    sun: SunMedium,
    trash: Trash,
    twitter: ({ ...props }: LucideProps) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="twitter"
        role="img"
        {...props}
      >
        <path
          d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
          fill="currentColor"
        />
      </svg>
    ),
    user: User,
    warning: AlertTriangle,
  };  