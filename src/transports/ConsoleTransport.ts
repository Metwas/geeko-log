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

import { createTemplateString } from "../tools/logger";
import { Template } from "../types/LogOptions";
import Transport from "winston-transport";
import { SonicBoom } from "sonic-boom";
import { EOL } from "node:os";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Fast, utf08 only in stream logger
 *
 * @public
 * @type {SonicBoom}
 */
export const sonic: SonicBoom = new SonicBoom({
       fd: process.stdout.fd,
       sync: true,
});

/**
 * @see SonicBoom console transporter
 *
 * @public
 */
export class SonicConsoleTransport extends Transport {
       /**
        * Default constructor
        *
        * @public
        * @param {Transport.TransportStreamOptions} options
        */
       public constructor(options?: Transport.TransportStreamOptions) {
              super(options);
       }

       /**
        * Log entry point
        *
        * @public
        * @param {Object} information
        * @param {Function} callback
        */
       public log(information: any, callback?: Function): void {
              const template: Template = information?.["template"];
              /** Write using @see sonic */
              sonic.write(
                     (template
                            ? createTemplateString(template, information)
                            : information) + EOL,
              );

              if (typeof callback === "function") {
                     callback();
              }
       }
}
