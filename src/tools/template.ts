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

import { Badge, Style, Template } from "../types/LogOptions";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Self returning parameter function - echo
 *
 * @public
 * @param {T} value
 * @returns {T}
 */
export function echo<T>(value: T): T {
       return value;
}

/**
 * Helper function for creating a @see string from the provided @see Template interface
 *
 * @public
 * @param {Template} template
 * @returns {String}
 */
export const createTemplateString: any = (
       template: Template,
       artifacts?: any,
): string => {
       const badges: Array<Badge> = template?.["badges"];

       const length: number = Array.isArray(badges) ? badges.length : 0;
       let index: number = 0;

       let builder: string = "";

       for (; index < length; index++) {
              const badge: string = createBadgeString(badges[index], artifacts);

              if (typeof badge === "string") {
                     builder += badge + " ";
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
export const createBadgeString: any = (
       badge: Badge,
       artifacts?: any,
): string => {
       const styling: Style =
              typeof badge["style"] === "function" ? badge["style"] : echo;
       const tag: string = artifacts?.[badge["key"]] || badge["tag"] || "";

       return styling(tag, artifacts);
};
