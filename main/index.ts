import { HttpRequest } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';
import { createApp } from '../src/main.azure';
import { Context } from 'vm';

export default function (context: Context, req: HttpRequest): void {
    AzureHttpAdapter.handle(createApp, context, req);
}
