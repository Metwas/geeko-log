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

const { LogService } = require("../../dist/main");

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

const logger = new LogService({
       title: "TEST",
       level: "debug",
});

let a = 0;

setInterval(() => {
       a++;
       logger.info("Log info:   \t" + a);
       logger.warn("Log warn:   \t" + a);
       logger.debug("Log debug:   \t" + a);
       logger.verbose("Log verbose:   \t" + a);
       logger.error("Log error:   \t" + a);
}, 500);
