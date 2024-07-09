export interface IButton {
    title: string;
    variant?: string;
    onClick?: () => void;  //? significa opcional
    type?: string;
}
export interface IButtonStyled {
    variant: string;
}
