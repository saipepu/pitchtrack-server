import { Module } from "@nestjs/common";
import { TimerGateway } from "./timers.gateway";

@Module({
    imports: [],
    providers: [TimerGateway],
    exports: []
})
export class TimerModule {}