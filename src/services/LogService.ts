/**
     MIT License

     @Copyright (c) Metwas

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above Copyright notice and this permission notice shall be included in all
     copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR Copyright HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     SOFTWARE.
*/

/**_-_-_-_-_-_-_-_-_-_-_-_-_- @Imports _-_-_-_-_-_-_-_-_-_-_-_-_-*/

import { createDefaultLogger, appBadgeTemplate } from "../tools/logger";
import { SonicConsoleTransport } from "../transports/ConsoleTransport";
import { LogConstructorOptions } from "../types/LogConstructorOptions";
import { LogLevel, Template } from "../types/LogOptions";
import { Spinner, createSpinner } from "nanospinner";
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
export class LogService
{
       /**
        * Initializes this log provider with the given @see LogConstructorOptions
        * 
        * @public
        * @param {LogConstructorOptions} options
        */
       public constructor( options?: LogConstructorOptions )
       {
              /** Assign default @see SonicConsoleTransport if not defined */
              this._logger = options?.logger ?? createLogger( {
                     level: options?.level ?? "info",
                     silent: options?.level === "quiet",
                     transports: [
                            new SonicConsoleTransport()
                     ]
              } );

              this._template = options?.template ?? appBadgeTemplate;
              this._title = options?.title ?? "App";
              this._level = options?.level ?? "info";

              this.format( createDefaultLogger( this._title ) );

              /** Remove any NodeJS warning messages if not set to debug */
              if ( options?.level !== "debug" )
              {
                     process.removeAllListeners( "warning" );
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
       private _logger: Logger = void 0;

       /**
        * Output styling template configuration
        * 
        * @private
        * @type {Template}
        */
       private _template: Template = void 0;

       /**
        * Console loader/spinner interface
        * 
        * @private
        * @type {Spinner}
        */
       private _spinner: Spinner = void 0;

       /**
        * @see Spinner loading state reference
        * 
        * @private
        * @type {Boolean}
        */
       private _loading: boolean = false;

       /**
        * Information level logging
        * 
        * @public
        * @param {String} message
        */
       public info( message: string ): void
       {
              this._log( "info", message );
       }

       /**
        * Warning level logging
        * 
        * @public
        * @param {String} message
        */
       public warn( message: string ): void
       {
              this._log( "warn", message );
       }

       /**
        * Verbose level logging
        * 
        * @public
        * @param {String} message
        */
       public verbose( message: string ): void
       {
              this._log( "verbose", message );
       }

       /**
        * Error level logging
        * 
        * @public
        * @param {String} error
        */
       public error( error: Error | string ): void
       {
              this._log( "error", ( error?.[ "message" ] ? error[ "message" ] : error ) );
       }

       /**
        * General debug level logging
        * 
        * @public
        * @param {String} message
        */
       public debug( message: string ): void
       {
              this._log( "debug", message );
       }

       /**
        * Updates the underlying log format function
        * 
        * @public
        * @param {Format} formatter 
        * @returns {LogService}
        */
       public format( formatter: any ): void
       {
              if ( this._logger )
              {
                     this._logger.format = formatter;
              }

              /** Create & style the @see Spinner  */
              this._spinner = createSpinner( void 0, {
                     color: ( this._template?.accent as any ) ?? "green"
              } );
       }

       /**
        * Gets the underlying metadata assigned to this logger service
        * 
        * @public
        * @returns {Object}
        */
       public getMetadata(): any
       {
              return {
                     template: this._template
              };
       }

       /**
        * Sets the title to the provided @see String
        * 
        * @public
        * @param {String} title 
       */
       public setTitle( title: string ): void
       {
              if ( typeof title === "string" )
              {
                     this._title = title;
                     /** re-render the logger format template */
                     this.format( createDefaultLogger( this._title ) );
              }
       }

       /**
        * Creates a child @see Logger with specified metadata overrides
        * 
        * @public
        * @param {String} title
        * @param {LogConstructorOptions} options 
        * @returns {LogService}
        */
       public branch( title: string, options?: LogConstructorOptions ): LogService
       {
              const metadata: any = this.getMetadata();
              const parentTemplate: any = metadata?.[ "template" ] || appBadgeTemplate;

              /** Clone logger options exact ( Unless specified in the @see LogOptions ) from the initial injected options for this @see LogService */
              const logger: Logger = createLogger( {
                     silent: ( options?.level ?? this._level ) === "quiet",
                     transports: this._logger.transports.slice( 0 )
              } );

              const logService: LogService = new LogService( {
                     level: options?.level ?? this._level,
                     template: parentTemplate,
                     logger: logger,
                     title: title
              } );

              return logService;
       }

       /**
        * Enables a visual loader on the stdout. If enabled, any further logs will be appended to the spinner
        * 
        * @public
        * @param {Boolean} enabled 
        * @param {String} marker 
        */
       public spinner( enabled?: boolean, marker?: string ): void
       {
              if ( this._level === "quiet" )
              {
                     return;
              }

              this._loading = enabled;

              if ( enabled )
              {
                     this._spinner.start( {
                            text: " "
                     } );
              }
              else
              {
                     this._spinner.success( {
                            mark: marker ?? " ",
                            text: " "
                     } );

                     process.stdout.write( CLI_SHIFT_UP );
                     process.stdout.write( CLI_CLEAR_LINE );
              }
       }

       /**
        * Controls the @see Spinner and other console output states when logging standard messages
        * 
        * @private
        * @param {String} method 
        * @param {String} message
        */
       private _log( method: string, message: string )
       {
              this._logger[ method ]( message, this.getMetadata() );

              if ( this._loading )
              {
                     this._spinner.update( { text: message } );
                     process.stdout.write( CLI_SHIFT_UP );
                     process.stdout.write( CLI_CLEAR_LINE );
              }
       }
}
