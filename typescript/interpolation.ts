/** This file is part of natlib.
 * https://github.com/mvasilkov/natlib
 * @license MIT | Copyright (c) 2022, 2023, 2024 Mark Vasilkov
 */

//#region Easing functions


//#endregion

export const oscillate = (t: number): number => (t *= 2) < 1 ? t : 2 - t
