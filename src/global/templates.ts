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

import { Badge, LogOptions, Template } from "../types/LogOptions";
import { pretty } from "../tools/strings";
import * as chalk from "chalk";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Geeko application @see Badge
 * 
 * @public
 * @type {Badge}
 */
export const appBadge: Badge = {
       tag: "Geeko",
       style: ( text: string, options?: LogOptions ): string =>
       {
              const level: string = options?.level;
              text = ` ${text} `;

              switch ( level )
              {
                     case "error":
                            return chalk.bgRedBright.black.bold( text );
                     case "verbose":
                            return chalk.bgMagentaBright.black.bold( text );
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

              const level: string = options?.level;

              switch ( level )
              {
                     case "error":
                            return chalk.redBright( text );
                     case "verbose":
                            return chalk.magentaBright( text );
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
                            return chalk.bgMagentaBright.black.bold( text );
                     case "warn":
                            return chalk.bgYellow.black.bold( text );
                     default:
                            return chalk.bgGreenBright.black.bold( text );
              };
       }
};

/**
 * Default application Geeko badge template
 */
export const GeekoBadgeTemplate: Template = {
       badges: [ appBadge, processBadge, timestampBadge, titleBadge, messageBadge ],
       gap: {
              tag: " ",
              style: ( text: string, options?: LogOptions ) =>
              {
                     return text;
              }
       }
};