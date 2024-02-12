/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const authentication_module_1 = __webpack_require__(8);
const mailer_1 = __webpack_require__(22);
const path_1 = __webpack_require__(23);
const handlebars_adapter_1 = __webpack_require__(33);
const handlebars_1 = __webpack_require__(34);
const jwt_1 = __webpack_require__(30);
const user_module_1 = __webpack_require__(35);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.development', '.env.production'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                    useNewUrlParser: true,
                }),
                inject: [config_1.ConfigService],
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '5d' },
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: `smtps://${process.env.SMTP_USERNAME}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_DOMAIN}`,
                    defaults: {
                        from: '"PropertyMart Support" <support@propertymart.com>',
                    },
                    template: {
                        dir: (0, path_1.join)(process.cwd(), '/templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(handlebars_1.helpers, {
                            inlineCssEnabled: true,
                            inlineCssOptions: {
                                url: ' ',
                                preserveMediaQueries: true,
                            },
                        }),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            authentication_module_1.AuthenticationModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = exports.AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationModule = void 0;
const common_1 = __webpack_require__(3);
const authentication_controller_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(7);
const user_schema_1 = __webpack_require__(12);
const user_authentication_service_1 = __webpack_require__(10);
const email_1 = __webpack_require__(19);
const otp_1 = __webpack_require__(24);
const jwt_1 = __webpack_require__(30);
let AuthenticationModule = exports.AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            otp_1.OtpModule,
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [user_authentication_service_1.UserAuthenticationService, email_1.EmailService, otp_1.OtpService, jwt_1.JwtService],
    })
], AuthenticationModule);


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthenticationController = void 0;
const common_1 = __webpack_require__(3);
const user_authentication_service_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(15);
const user_schema_1 = __webpack_require__(12);
const userlogin_dto_1 = __webpack_require__(31);
const resetpassword_dto_1 = __webpack_require__(32);
let AuthenticationController = exports.AuthenticationController = class AuthenticationController {
    constructor(userService) {
        this.userService = userService;
    }
    async createNormalUserAccount(body) {
        return this.userService.createUserAccount(body);
    }
    async login(body) {
        return this.userService.login(body);
    }
    async resetPasswordRequest(email) {
        return this.userService.sendResetEmail(email);
    }
    async resendEmailVerificationRequest(email) {
        return this.userService.resendEmailVerifcationOtp(email);
    }
    async verifyPasswordResetCode(code, id) {
        return this.userService.verifyPasswordResetOtp(code, id);
    }
    async verifyEmailCode(code, id) {
        return this.userService.verifyEmail(code, id);
    }
    async resetPassword(body) {
        return this.userService.resetPassword(body);
    }
    deleteAccount(email) {
        return this.userService.deleteAccount(email);
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: user_schema_1.User }),
    (0, common_1.Post)('create-account'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "createNormalUserAccount", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: userlogin_dto_1.UserLoginDto }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof userlogin_dto_1.UserLoginDto !== "undefined" && userlogin_dto_1.UserLoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'email' }),
    (0, common_1.Get)('user/request-password-reset-otp/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "resetPasswordRequest", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'email' }),
    (0, common_1.Get)('user/resend-email-verification-otp/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "resendEmailVerificationRequest", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'code' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Put)('user/verify-passwordreset-otp/:code/:id'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "verifyPasswordResetCode", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'code' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, common_1.Put)('user/verify-email-otp/:code/:id'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "verifyEmailCode", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: resetpassword_dto_1.ResetPasswordDto }),
    (0, common_1.Put)('user/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof resetpassword_dto_1.ResetPasswordDto !== "undefined" && resetpassword_dto_1.ResetPasswordDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'email' }),
    (0, common_1.Delete)('/user/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "deleteAccount", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('authentication'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_authentication_service_1.UserAuthenticationService !== "undefined" && user_authentication_service_1.UserAuthenticationService) === "function" ? _a : Object])
], AuthenticationController);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserAuthenticationService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAuthenticationService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(11);
const user_schema_1 = __webpack_require__(12);
const bcryptjs_1 = __webpack_require__(16);
const UserRoles_1 = __webpack_require__(17);
const VerificationLevel_1 = __webpack_require__(18);
const email_1 = __webpack_require__(19);
const jwt_1 = __webpack_require__(30);
const config_1 = __webpack_require__(6);
const otp_1 = __webpack_require__(24);
let UserAuthenticationService = exports.UserAuthenticationService = UserAuthenticationService_1 = class UserAuthenticationService {
    constructor(userModel, emailService, otpService, jwtService, configService) {
        this.userModel = userModel;
        this.emailService = emailService;
        this.otpService = otpService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(UserAuthenticationService_1.name);
    }
    async createUserAccount(user) {
        const userExists = await this.userModel.find({ email: user.email });
        if (userExists.length > 0) {
            throw new common_1.BadRequestException('An account with that email already exist');
        }
        const hash = await this.hashPassword(user.password);
        user.password = hash;
        user['roles'] = [UserRoles_1.USER_ROLE.USER];
        user['verification_level'] = VerificationLevel_1.VERIFICATION_LEVEL.BASIC;
        const referral = await this.userModel.findOne({ referralId: user.referralId });
        if (!referral) {
            user['referralId'] = null;
        }
        if (referral && referral.referralId === user.referralId) {
            user['referralId'] = '';
        }
        const newUser = new this.userModel(user);
        newUser.save();
        delete newUser['password'];
        this.logger.debug(newUser);
        await this.emailService.sendEmailVerificationOTP(newUser);
        return {
            message: 'Account created successfully',
            data: newUser,
        };
    }
    async login(userDetails) {
        const user = await this.userModel.findOne({ email: userDetails.email });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const isMatch = await (0, bcryptjs_1.compare)(userDetails.password, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const token = this.jwtService.sign({
            id: user._id,
            email: user.email,
            roles: user.roles,
        }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '5d',
            algorithm: 'HS256',
        });
        const refreshToken = this.jwtService.sign({
            id: user._id,
            email: user.email,
            roles: user.roles,
        }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '1y',
            algorithm: 'HS256',
        });
        delete user['password'];
        return {
            message: 'Login successful',
            data: {
                token,
                refreshToken,
                user: { ...user['_doc'], password: '' },
            },
        };
    }
    async resendEmailVerifcationOtp(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException('No account found with that email');
        }
        await this.emailService.sendEmailVerificationOTP(user);
        return {
            message: 'OTP sent!',
        };
    }
    async verifyEmail(otp, user_id) {
        const user = await this.userModel.findById(user_id);
        if (!user) {
            throw new common_1.BadRequestException('No account found with that email');
        }
        const isValid = await this.otpService.verifyEmailOtp(otp, user_id);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        const updatedSchema = await this.userModel.updateOne({ _id: user._id }, { emailVerified: true });
        return {
            message: 'email verified',
        };
    }
    async verifyPasswordResetOtp(otp, user_id) {
        const user = await this.userModel.findById(user_id);
        if (!user) {
            throw new common_1.BadRequestException('No account found with that email');
        }
        const isValid = await this.otpService.verifyResetOtp(otp, user_id);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        return {
            message: 'OTP verified',
        };
    }
    async sendResetEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException('No account found with that email');
        }
        await this.emailService.sendPasswordResetLink(user);
        return {
            message: 'Reset email sent',
            data: {
                id: user._id,
            },
        };
    }
    async resetPassword(payload) {
        const user = await this.userModel.findById(payload.user_id);
        if (user === null) {
            throw new common_1.BadRequestException('User not found');
        }
        const newPassword = await this.hashPassword(payload.password);
        await this.userModel.findByIdAndUpdate(payload.user_id, {
            password: newPassword,
        });
        return {
            message: 'password updated, you can now login',
        };
    }
    async hashPassword(password) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        return await (0, bcryptjs_1.hash)(password, salt);
    }
    async deleteAccount(email) {
        const user = await this.userModel.findOne({ email });
        if (user === null) {
            throw new common_1.BadRequestException('User with this email not found!');
        }
        const deletedAccount = await this.userModel.deleteOne({ email });
        return {
            message: deletedAccount.deletedCount > 0 ? 'Account deleted' : 'account not deleted try again',
        };
    }
};
exports.UserAuthenticationService = UserAuthenticationService = UserAuthenticationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof otp_1.OtpService !== "undefined" && otp_1.OtpService) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object])
], UserAuthenticationService);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(13);
const class_transformer_1 = __webpack_require__(14);
const swagger_1 = __webpack_require__(15);
let User = exports.User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.String }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        index: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
        trim: true,
        max: 15,
        min: 11,
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
        trim: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Boolean,
        trim: true,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
        trim: true,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "referralId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
        trim: true,
        default: '',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "referralCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: [mongoose_2.SchemaTypes.String],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "verification_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Date,
        default: new Date().toISOString(),
        trim: true,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Date,
        default: new Date().toISOString(),
        trim: true,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updated_at", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)(),
    (0, class_transformer_1.Exclude)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USER_ROLE = void 0;
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "USER";
    USER_ROLE["SELLER"] = "SELLER";
    USER_ROLE["AGENT"] = "AGENT";
})(USER_ROLE || (exports.USER_ROLE = USER_ROLE = {}));


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERIFICATION_LEVEL = void 0;
var VERIFICATION_LEVEL;
(function (VERIFICATION_LEVEL) {
    VERIFICATION_LEVEL["BASIC"] = "BASIC";
})(VERIFICATION_LEVEL || (exports.VERIFICATION_LEVEL = VERIFICATION_LEVEL = {}));


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(21), exports);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailModule = void 0;
const common_1 = __webpack_require__(3);
const email_service_1 = __webpack_require__(21);
const mongoose_1 = __webpack_require__(7);
const user_schema_1 = __webpack_require__(12);
let EmailModule = exports.EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(3);
const mailer_1 = __webpack_require__(22);
const path_1 = __webpack_require__(23);
const src_1 = __webpack_require__(24);
const otp_enum_1 = __webpack_require__(28);
let EmailService = exports.EmailService = EmailService_1 = class EmailService {
    constructor(otpService, mailService) {
        this.otpService = otpService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    async sendEmailVerificationOTP(user) {
        const otp = await this.otpService.generateOtp({
            isUser: true,
            type: otp_enum_1.OTPENUM.VERIFICATION,
            user_id: user['_id'],
        });
        const emailFeedBack = await this.mailService.sendMail({
            to: user.email,
            subject: 'Verify your email',
            template: (0, path_1.join)(process.cwd(), 'templates/verify-email.hbs'),
            context: {
                code: otp,
            },
        });
        this.logger.log(emailFeedBack);
    }
    async sendPasswordResetLink(user) {
        console.log(user);
        const otp = await this.otpService.generateOtp({
            isUser: true,
            type: otp_enum_1.OTPENUM.PASSWORD_RESET,
            user_id: user['_id'],
        });
        const emailFeedBack = await this.mailService.sendMail({
            to: user.email,
            subject: 'Verify your email',
            template: (0, path_1.join)(process.cwd(), 'templates/passwordReset.hbs'),
            context: {
                url: `${otp}`,
            },
        });
        this.logger.log(emailFeedBack);
    }
};
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof src_1.OtpService !== "undefined" && src_1.OtpService) === "function" ? _a : Object, typeof (_b = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _b : Object])
], EmailService);


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpModule = void 0;
const common_1 = __webpack_require__(3);
const otp_service_1 = __webpack_require__(26);
const mongoose_1 = __webpack_require__(7);
const otp_schema_1 = __webpack_require__(29);
let OtpModule = exports.OtpModule = class OtpModule {
};
exports.OtpModule = OtpModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Otp', schema: otp_schema_1.OtpSchema }])],
        providers: [otp_service_1.OtpService],
        exports: [otp_service_1.OtpService, mongoose_1.MongooseModule],
    })
], OtpModule);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OtpService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpService = void 0;
const common_1 = __webpack_require__(3);
const crypto_1 = __webpack_require__(27);
const otp_enum_1 = __webpack_require__(28);
const mongoose_1 = __webpack_require__(7);
const otp_schema_1 = __webpack_require__(29);
const mongoose_2 = __webpack_require__(11);
let OtpService = exports.OtpService = OtpService_1 = class OtpService {
    constructor(otpModel) {
        this.otpModel = otpModel;
        this.logger = new common_1.Logger(OtpService_1.name);
    }
    generateNumber() {
        const code = (0, crypto_1.randomInt)(100, 899);
        const code2 = (0, crypto_1.randomInt)(200, 999);
        return `${code}${code2}`;
    }
    async generateOtp({ type, user_id, }) {
        const code = this.generateNumber();
        const otp = await this.otpModel.create({
            type,
            user_id,
            code,
        });
        otp.save();
        const timeout = setTimeout(() => {
            this.markAsExpired(otp._id);
            clearTimeout(timeout);
        }, 5 * 60000);
        this.logger.verbose(otp);
        return code;
    }
    async verifyEmailOtp(code, userId) {
        const otp = await this.otpModel.findOne({ code, user_id: userId });
        if (otp === null || otp === undefined) {
            return false;
        }
        if (otp.isExpired) {
            return false;
        }
        else {
            await this.otpModel.updateOne({
                _id: otp._id,
            }, {
                isExpired: true,
            });
            return true;
        }
    }
    async verifyResetOtp(code, userId) {
        const otp = await this.otpModel.findOne({
            code,
            user_id: userId,
            type: otp_enum_1.OTPENUM.PASSWORD_RESET,
        });
        if (otp === null || otp === undefined) {
            return false;
        }
        if (otp.isExpired) {
            return false;
        }
        else {
            await this.otpModel.updateOne({
                _id: otp._id,
            }, {
                isExpired: true,
            });
            return true;
        }
    }
    async markAsExpired(id) {
        const otp = await this.otpModel.updateOne({
            _id: id,
        }, {
            isExpired: true,
        });
        this.logger.verbose(otp);
    }
};
exports.OtpService = OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], OtpService);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OTPENUM = void 0;
var OTPENUM;
(function (OTPENUM) {
    OTPENUM["VERIFICATION"] = "VERIFICATION";
    OTPENUM["PASSWORD_RESET"] = "PASSWORD_RESET";
})(OTPENUM || (exports.OTPENUM = OTPENUM = {}));


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpSchema = exports.Otp = void 0;
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(13);
const class_transformer_1 = __webpack_require__(14);
const swagger_1 = __webpack_require__(15);
let Otp = exports.Otp = class Otp {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.ObjectId !== "undefined" && mongoose_2.ObjectId) === "function" ? _a : Object)
], Otp.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
    }),
    __metadata("design:type", String)
], Otp.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.String,
    }),
    __metadata("design:type", String)
], Otp.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Otp.prototype, "isExpired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Date,
        default: new Date().toISOString(),
        trim: true,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Otp.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    (0, mongoose_1.Prop)({
        type: mongoose_2.SchemaTypes.Date,
        default: new Date().toISOString(),
        trim: true,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Otp.prototype, "updated_at", void 0);
exports.Otp = Otp = __decorate([
    (0, mongoose_1.Schema)(),
    (0, class_transformer_1.Exclude)()
], Otp);
exports.OtpSchema = mongoose_1.SchemaFactory.createForClass(Otp);


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserLoginDto = void 0;
const swagger_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(14);
const class_validator_1 = __webpack_require__(13);
let UserLoginDto = exports.UserLoginDto = class UserLoginDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserLoginDto.prototype, "password", void 0);
exports.UserLoginDto = UserLoginDto = __decorate([
    (0, class_transformer_1.Exclude)()
], UserLoginDto);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = void 0;
const swagger_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(14);
const class_validator_1 = __webpack_require__(13);
let ResetPasswordDto = exports.ResetPasswordDto = class ResetPasswordDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
exports.ResetPasswordDto = ResetPasswordDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ResetPasswordDto);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(3);
const user_controller_1 = __webpack_require__(36);
const users_service_1 = __webpack_require__(37);
const mongoose_1 = __webpack_require__(7);
const user_schema_1 = __webpack_require__(12);
const userauth_guard_1 = __webpack_require__(38);
const jwt_1 = __webpack_require__(30);
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema, collection: 'users' },
            ])
        ],
        controllers: [user_controller_1.UserController],
        providers: [users_service_1.UsersService, userauth_guard_1.UserauthGuard, jwt_1.JwtService]
    })
], UserModule);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(15);
const users_service_1 = __webpack_require__(37);
const userauth_guard_1 = __webpack_require__(38);
const current_user_decorator_1 = __webpack_require__(39);
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUserDetails(user) {
        return this.userService.getUserDetails(user.id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.UseGuards)(userauth_guard_1.UserauthGuard),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof current_user_decorator_1.REQUEST_USER !== "undefined" && current_user_decorator_1.REQUEST_USER) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserDetails", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('USER'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(11);
const user_schema_1 = __webpack_require__(12);
let UsersService = exports.UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserDetails(_id) {
        const user = await this.userModel.findById(_id);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return {
            message: 'user details',
            data: user,
        };
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserauthGuard_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserauthGuard = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(30);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(11);
const user_schema_1 = __webpack_require__(12);
let UserauthGuard = exports.UserauthGuard = UserauthGuard_1 = class UserauthGuard {
    constructor(jwtService, userModel, configService) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.configService = configService;
        this.logger = new common_1.Logger(UserauthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeaders(request.headers);
        if (!token) {
            throw new common_1.UnauthorizedException('Token not found in header');
        }
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            this.logger.debug(decoded);
            const isValidUser = await this.validateUser(decoded.id);
            if (!isValidUser) {
                throw new common_1.UnauthorizedException('Invalid user');
            }
            request.user = decoded;
            return true;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.UnauthorizedException('Invalid token!');
        }
    }
    async validateUser(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            return false;
        }
        return true;
    }
    extractTokenFromHeaders(headers) {
        const authHeader = headers.authorization || headers.Authorization;
        if (!authHeader) {
            return null;
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer.toLowerCase() !== 'bearer' || !token) {
            return null;
        }
        return token;
    }
};
exports.UserauthGuard = UserauthGuard = UserauthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], UserauthGuard);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(3);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("morgan");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(15);
const config_1 = __webpack_require__(6);
const morgan = __webpack_require__(40);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(morgan('combined'));
    app.setGlobalPrefix('api/v1');
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PROPERTY MART API')
        .setDescription('The Property Mart API description')
        .setVersion('0.0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, () => console.log(`SERVER RUNNING ON PORT : ${port}`));
}
bootstrap();

})();

/******/ })()
;