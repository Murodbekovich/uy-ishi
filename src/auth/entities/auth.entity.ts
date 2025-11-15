import { Column, Model, Table } from "sequelize-typescript";
import { toDefaultValue } from "sequelize/lib/utils";

@Table({tableName: "auth"})

export class Auth extends Model {
    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: number;

    @Column({defaultValue: false})
    isVerified?: boolean;

    @Column
    otp: number;

    @Column
    otpTime: number;
}