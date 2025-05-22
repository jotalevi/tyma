import axios from 'axios';

export default class Api {
    private static token: string | null = null;
    private static api = axios.create({
        baseURL: "localhost:3010",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    static async authLogin(user: string, password: string) {
        let res = await this.api.post('auth/login', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                'rut': user,
                'password': password
            }
        });

        console.log(res.data);
        return res.data;
    };

    static async authLogout() {};

    static async authForgotPassword(user: string) {
        let res = await this.api.post('auth/forgot-password', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                'rut': user,
            }
        });

        console.log(res.data);
        return res.data;
    };

    static async authChangePassword(user: string, oldPass: string, newPass: string) {
        let res = await this.api.post('auth/change-password', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                'rut': user,
                'oldPass': oldPass,
                'newPass': newPass
            }
        });

        console.log(res.data);
        return res.data;
    };

    static async userCreate(data: {
        rut: number,
        dv: string,
        names: string,
        surnames: string,
        email: string,
        password: string,
    }) {
        let res = await this.api.post('user', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        });

        console.log(res.data);
        return res.data;
    };

    static async userGet(id?: string) {
        if (!this.token) throw new Error('Must be logged in to get user data');

        let res = await this.api.get('user' + id ? `/${id}` : '', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(res.data);
        return res.data;
    };

    static async userMe() {
        return this.userGet('me');
    };

    static async userPendingReset(user: string) {
        let res = await this.api.get('user/pending-reset' + user, {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(res.data);
        return res.data;
    };

    static async userPut(
        user: string, 
        data: Partial<{
            rut: number,
            dv: string,
            names: string,
            surnames: string,
            email: string,
    }>) {
        if (!this.token) throw new Error('Must be logged in to update user data');

        let res = await this.api.put('user/' + user, {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        });

        console.log(res.data);
        return res.data;
    };

    static async userActivate(user: string) {
        if (!this.token) throw new Error('Must be logged in to activate user');

        let res = await this.api.put('user/' + user, {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(res.data);
        return res.data;
    };

    static async productCreate(data: {
        name: string,
        description: string,
        price: number,
        stock: number,
        imageB64: string,
        category: string,
        isAvailable: number,
    }) {
        if (!this.token) throw new Error('Must be logged in to create product');

        let res = await this.api.post('product', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        });

        console.log(res.data);
        return res.data;
    };

    static async productGet(id?: string) {
        let res = await this.api.get('product' + id ? `/${id}` : '', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(res.data);
        return res.data;
    };

    static async productPut(id: string, data: Partial<{
        name: string,
        description: string,
        price: number,
        stock: number,
        imageB64: string,
        category: string,
        isAvailable: number,
    }>) {
        if (!this.token) throw new Error('Must be logged in to update product data');

        let res = await this.api.put('product/' + id, {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        });

        console.log(res.data);
        return res.data;
    };

    static async saleCreate(productId: number, quantity: number) {
        let res = await this.api.post('sale/', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                itemId: productId,
                quantity: quantity
            }
        });

        console.log(res.data);
        return res.data;
    };

    static async salePut(saleId: number, productId: number, quantity: number) {
        let res = await this.api.put('sale/' + saleId, {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                itemId: productId,
                quantity: quantity
            }
        });

        console.log(res.data);
        return res.data;
    };

    static async saleGet(id?: string) {
        if (!this.token) throw new Error('Must be logged in to get sale data');

        let res = await this.api.get('sale' + id ? `/${id}` : '', {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(res.data);
        return res.data;
    };

    static async saleTransbank(id: string) {
        let res = await this.api.get('sale/transbank/' + id, {
            headers: this.token ? {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.token,
            } : {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(res.data);
        return res.data;
    };

    static async health() { };
}