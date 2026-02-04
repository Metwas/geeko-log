/**
 * Copyright (c) Metwas
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

/**_-_-_-_-_-_-_-_-_-_-_-_-_- Imports  _-_-_-_-_-_-_-_-_-_-_-_-_-*/

import {
       createDefaultLogger,
       appBadgeTemplate,
       GET_ARG_LEVEL,
} from "../tools/logger";

import { SonicConsoleTransport } from "../transports/ConsoleTransport";
import { LogConstructorOptions } from "../types/LogConstructorOptions";
import { LogLevel, Template } from "../types/LogOptions";
import { Logger, createLogger } from "winston";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Moves the CLI cursor up by 1 line
 *
 * @public
 * @type {String}
 */
export const CLI_SHIFT_UP: string = "\x1B[1A";

/**
 * Clears the entire current line
 *
 * @public
 * @type {String}
 */
export const CLI_CLEAR_LINE: string = "\x1B[2K";

/**
 * Global Logger service
 *
 * @public
 */
export class LogService {
       /**
        * Initializes this log provider with the given @see LogConstructorOptions
        *
        * @public
        * @param {LogConstructorOptions} options
        */
       public constructor(options?: LogConstructorOptions) {
              /** Assign default @see SonicConsoleTransport if not defined */
              this._logger =
                     options?.logger ??
                     createLogger({
                            level: options?.level ?? GET_ARG_LEVEL(),
                            silent: options?.level === "quiet",
                            transports: [new SonicConsoleTransport()],
                     });

              this._template = options?.template ?? appBadgeTemplate;
              this._title = this.title(options?.title ?? "App");
              this._level = options?.level ?? "info";

              this.format(createDefaultLogger(this._title));

              /** Remove any NodeJS warning messages if not set to debug */
              if (options?.level !== "debug") {
                     process.removeAllListeners("warning");
              }
       }

       /**
        * Logger title
        *
        * @private
        * @type {String}
        */
       private _title: string = "App";

       /**
        * Logger message level filter
        *
        * @private
        * @type {LogLevel}
        */
       private _level: LogLevel = "info";

       /**
        * Underlying @see Transport(s) logger provider
        *
        * @private
        * @type {Logger}
        */
       private _logger: Logger;

       /**
        * Output styling template configuration
        *
        * @private
        * @type {Template}
        */
       private _template: Template;

       /**
        * Information level logging
        *
        * @public
        * @param {String} message
        */
       public info(message: string): void {
              this._logger.info(message, this.getMetadata());
       }

       /**
        * Warning level logging
        *
        * @public
        * @param {String} message
        */
       public warn(message: string): void {
              this._logger.warn(message, this.getMetadata());
       }

       /**
        * Verbose level logging
        *
        * @public
        * @param {String} message
        */
       public verbose(message: string): void {
              this._logger.verbose(message, this.getMetadata());
       }

       /**
        * Error level logging
        *
        * @public
        * @param {String} error
        */
       public error(error: Error | string): void {
              if (!error) {
                     return void 0;
              }

              this._logger.error(
                     typeof error === "string"
                            ? error
                            : (error as Error).message,
                     this.getMetadata(),
              );
       }

       /**
        * General debug level logging
        *
        * @public
        * @param {String} message
        */
       public debug(message: string): void {
              this._logger.debug(message, this.getMetadata());
       }

       /**
        * Updates the underlying log format function
        *
        * @public
        * @param {Format} formatter
        * @returns {LogService}
        */
       public format(formatter: any): void {
              if (this._logger) {
                     this._logger.format = formatter;
              }
       }

       /**
        * Gets the underlying metadata assigned to this logger service
        *
        * @public
        * @returns {Object}
        */
       public getMetadata(): any {
              return {
                     template: this._template,
              };
       }

       /**
        * Gets/Sets the title to the provided @see String
        *
        * @public
        * @param {String} title
        * @returns {String}
        */
       public title(title?: string): string {
              if (typeof title === "string") {
                     this._title = " " + title.trim() + " ";
                     /** re-render the logger format template */
                     this.format(createDefaultLogger(this._title));
              }

              return this._title;
       }

       /**
        * Creates a child @see Logger with specified metadata overrides
        *
        * @public
        * @param {String} title
        * @param {LogConstructorOptions} options
        * @returns {LogService}
        */
       public branch(
              title: string,
              options?: LogConstructorOptions,
       ): LogService {
              const metadata: any = this.getMetadata();
              const parentTemplate: any =
                     metadata?.template || appBadgeTemplate;

              /** Clone logger options exact ( Unless specified in the @see LogOptions ) from the initial injected options for this @see LogService */
              const logger: Logger = createLogger({
                     silent: (options?.level ?? this._level) === "quiet",
                     transports: this._logger?.transports.slice(0),
              });

              const logService: LogService = new LogService({
                     level: options?.level ?? this._level,
                     template: parentTemplate,
                     logger: logger,
                     title: title,
              });

              return logService;
       }
}
