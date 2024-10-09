"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.Public = exports.IS_PUBLIC = exports.jwtConstants = void 0;
const common_1 = require("@nestjs/common");
exports.jwtConstants = {
    secret: 'Sanchit@Work Auth JWT Secret Key',
};
exports.IS_PUBLIC = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC, true);
exports.Public = Public;
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=constants.js.map