import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

/**
 * AUTHENTICATION
 */
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';

/**
 * USERS MODULE
 */
import { UsersModule } from './users/users.module';

/**
 * GROUPS MODULE
 */
import { GroupsModule } from './groups/groups.module';

/**
 * PERMISSIONS MODULE
 */
import { PermissionsModule } from './permissions/permissions.module';

/**
 * ADMIN MODULE
 */
import { AdminModule } from './admin/admin.module';

/**
 * PROJECTS MODULE
 */
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      logging: false,
      define: {
        underscored: true,
        timestamps: false,
      },
      autoLoadModels: true,
      synchronize: true,
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'saw',
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
    UsersModule,
    GroupsModule,
    PermissionsModule,
    AdminModule,
    ProjectsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class SawModule {}
