export class BasePage{
    constructor(page){
        this.page = page;
        this.baseUrl = process.env.BASE_URL;

        if (!this.baseUrl) {
            throw new Error('BASE_URL is not defined');
        }
    }

    async navigate(path = '') {
        await this.page.goto(`${this.baseUrl}${path}`, {
            waitUntil: 'domcontentloaded',
        });
    }

    async getTitle(){
        return await this.page.title();
    }
}