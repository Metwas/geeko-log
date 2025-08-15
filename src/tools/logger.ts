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

import { Badge, LogLevel, LogOptions, Style, Template } from '../types/LogOptions';
import { format } from 'winston';
import chalk from "chalk";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Import log format helper functions
 */
const { combine, timestamp, label, printf } = format;

/**
 * Default JSON stringify tab size
 * 
 * @public
 * @type {Number}
 */
export let JSON_TAB_SIZE: number = 4;

/**
 * Default pretty formatter
 * 
 * @public
 * @type {Function}
 */
const defaultFormatter: any = printf( ( { level, message, label, timestamp } ): any =>
{
       return `${timestamp} [${label}] ${level}: ${message}`;
} );

/**
 * Creates a default Winston log formatter
 * 
 * @public
 * @param {String} header 
 * @returns {Format}
 */
export const createDefaultLogger: any = ( header: string ) =>
{
       return combine( label( { label: header } ), timestamp(), defaultFormatter );
};

/**
 * Self returning parameter function - echo
 * 
 * @public
 * @param {T} value 
 * @returns {T}
 */
export function echo<T>( value: T ): T
{
       return value;
};

/**
 * Helper function for creating a @see string from the provided @see Template interface
 * 
 * @public
 * @param {Template} template 
 * @returns {String}
 */
export const createTemplateString: any = ( template: Template, artifacts?: any ): string =>
{
       const badges: Array<Badge> = template?.[ "badges" ];

       const length: number = Array.isArray( badges ) ? badges.length : 0;
       let index: number = 0;

       let builder: string = "";

       for ( ; index < length; index++ )
       {
              const badge: string = createBadgeString( badges[ index ], artifacts );

              if ( typeof badge === "string" )
              {
                     builder += badge;
                     builder += " ";
              }
       }

       return builder;
};

/**
 * Helper for creating @see string from the provided @see Badge styling template
 * 
 * @public
 * @param {Badge} badge 
 * @param {Object} artifacts 
 * @returns {String}
 */
export const createBadgeString: any = ( badge: Badge, artifacts?: any ): string =>
{
       const styling: Style = typeof badge[ "style" ] === "function" ? badge[ "style" ] : echo;
       const tag: string = artifacts?.[ badge[ "key" ] ] || badge[ "tag" ] || "";

       return styling( tag, artifacts );
};

/**
 * Formats any @see Object into user-friendly string format
 * 
 * @public
 * @param {Object | String | Date} message
 * @returns {String}
 */
export const pretty: any = ( message: any ): string =>
{
       return JSON.stringify( message, null, JSON_TAB_SIZE );
};

/**
 * Application @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const appBadge: Badge = {
       tag: "App",
       style: ( text: string, options?: LogOptions ): string =>
       {
              const level: string = options?.level;
              text = ` ${text} `;

              switch ( level )
              {
                     case "error":
                            return chalk.bgRedBright.black.bold( text );
                     case "verbose":
                     case "debug":
                            return chalk.bgGray.black.bold( text );
                     case "warn":
                            return chalk.bgYellow.black.bold( text );
                     default:
                            return chalk.bgGreenBright.black.bold( text );
              };
       }
};

/**
 * Process ID application @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const processBadge: Badge = {
       tag: "process",
       style: ( text: string, options?: LogOptions ): string =>
       {
              return chalk.blackBright( process.pid );
       }
};

/**
 * Padding @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const paddingBadge: Badge = {
       tag: "",
       style: ( text: string, options?: LogOptions ): string =>
       {
              const level: string = options?.level;
              text = ` ${text} `;

              switch ( level )
              {
                     case "error":
                            return chalk.bgRedBright.black.bold( text );
                     case "verbose":
                     case "debug":
                            return chalk.bgGray.black.bold( text );
                     case "warn":
                            return chalk.bgYellow.black.bold( text );
                     default:
                            return chalk.bgGreenBright.black.bold( text );
              };
       }
};

/**
 * Timestamp artifact to @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const timestampBadge: Badge = {
       key: "timestamp",
       style: ( text: string, options?: LogOptions ): string =>
       {
              return text;
       }
};

/**
 * Message artifact to @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const messageBadge: Badge = {
       key: "message",
       style: ( text: string, options?: LogOptions ) =>
       {
              if ( typeof text === "object" )
              {
                     text = pretty( text );
              }

              const level: LogLevel = options?.level;

              switch ( level )
              {
                     case "error":
                            return chalk.redBright( text );
                     case "verbose":
                     case "debug":
                            return chalk.gray.bold( text );
                     case "warn":
                            return chalk.yellow( text );
                     default:
                            return chalk.greenBright( text );
              };
       }
};

/**
 * Title artifact to @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const titleBadge: Badge = {
       key: "title",
       style: ( text: string, options?: LogOptions ) =>
       {
              const level: string = options?.level
              text = ` ${text || options?.label || "-"} `;

              switch ( level )
              {
                     case "error":
                            return chalk.bgRedBright.black.bold( text );
                     case "verbose":
                     case "debug":
                            return chalk.bgMagentaBright.black.bold( text );
                     case "warn":
                            return chalk.bgYellow.black.bold( text );
                     default:
                            return chalk.bgGreenBright.black.bold( text );
              };
       }
};

/**
 * Default application badge template
 * 
 * @public
 * @type {Template}
 */
export const appBadgeTemplate: Template = {
       badges: [ appBadge, processBadge, timestampBadge, titleBadge, messageBadge ],
       gap: {
              tag: " ",
              style: ( text: string, options?: LogOptions ) =>
              {
                     return text;
              }
       }
};

/**
 * Default text template
 * 
 * @public
 * @type {Template}
 */
export const textTemplate: Template = {
       badges: [ messageBadge ],
       gap: {
              tag: " ",
              style: ( text: string, options?: LogOptions ) =>
              {
                     return text;
              }
       }
};
