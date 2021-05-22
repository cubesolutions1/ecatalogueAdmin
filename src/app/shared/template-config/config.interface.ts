export interface TemplateConfig
{
    layout: {
        variant: string
        dir: string,
        navbar: string,
        menuPosition:string,
        customizer: {
            hidden: boolean
        },
        sidebar: {
            collapsed: boolean,
            size: string,
            backgroundColor: string,
            backgroundImage: boolean,
            backgroundImageURL: string
        }
    };
}
