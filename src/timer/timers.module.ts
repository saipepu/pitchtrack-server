import { Module } from "@nestjs/common";
import { TimerGateway } from "./timers.gateway";


@Module({
    providers: [TimerGateway]
})
export class TimerModule {}