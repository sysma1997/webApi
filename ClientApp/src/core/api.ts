type Method = "GET" | "POST";

class ApiResponse {
    constructor(readonly status: number, readonly result: string) { }

    toString() {
        return JSON.stringify({
            status: this.status,
            result: this.result
        });
    }
}
class Api {
    
    static async Init(method: Method, api: string, body?: any, action?: any) {
        let headers: HeadersInit = {
            "Content-Type": "application/json; charset=utf-8;"
        };
        // token

        const response = await fetch(`/api/${api}`, {
            method: method,
            headers: headers,
            body: (body) ? JSON.stringify(body) : null
        });

        const status = response.status;
        const result = await response.text();
        const res = new ApiResponse(status, result);

        if (action) action(res);

        return res;
    }
}