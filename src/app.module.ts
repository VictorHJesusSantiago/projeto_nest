import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { GuestsModule } from './guests/guests.module';
import { AuthModule } from './auth/auth.module';
// Importando os novos módulos
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    TeachersModule,
    GuestsModule,
    AuthModule,
    // Registrando os novos módulos
    StudentsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}