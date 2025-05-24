export class Database
{
    constructor()
    {
        this.database = {};
    }

    IsDataExist = (key) => (key in this.database);
    UpdateData = (key ,val) => this.database[key] = val;
    GetData = (key) => this.database[key];
    RemoveData = (key) => delete this.database[key];
};