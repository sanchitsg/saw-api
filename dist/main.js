"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const saw_module_1 = require("./saw.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(saw_module_1.SawModule, { cors: true });
    await app.listen(8070);
}
bootstrap();
//# sourceMappingURL=main.js.map