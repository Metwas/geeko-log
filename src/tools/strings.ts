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

/**
 * Default JSON stringify tab size
 *
 * @public
 * @type {Number}
 */
export let JSON_TAB_SIZE: number = 4;

/**
 * Formats any @see Object into user-friendly string format
 *
 * @public
 * @param {Object | String | Date} message
 * @returns {String}
 */
export const pretty: any = (message: any): string => {
       return JSON.stringify(message, null, JSON_TAB_SIZE);
};
