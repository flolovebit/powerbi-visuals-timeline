/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual.granularity {
    // datePeriod
    import TimelineDatePeriod = datePeriod.TimelineDatePeriod;
    // utils
    import Utils = utils.Utils;
    import Selection = d3.Selection;

    export class DayGranularity extends TimelineGranularityBase {
        constructor(calendar: Calendar, locale: string) {
            super(calendar, locale, Utils.getGranularityPropsByMarker("D"));
        }

        public render(props: GranularityRenderProps, isFirst: boolean): Selection<any> {
            if (!props.granularSettings.granularityDayVisibility) {
                return null;
            }

            return super.render(props, isFirst);
        }

        public getType(): GranularityType {
            return GranularityType.day;
        }

        public splitDate(date: Date): (string | number)[] {
            return [
                this.shortMonthName(date),
                date.getDate(),
                this.determineYear(date)
            ];
        }

        public sameLabel(firstDatePeriod: TimelineDatePeriod, secondDatePeriod: TimelineDatePeriod): boolean {
            return firstDatePeriod.startDate.getTime() === secondDatePeriod.startDate.getTime();
        }

        public generateLabel(datePeriod: TimelineDatePeriod): TimelineLabel {
            const title: string = `${this.shortMonthName(datePeriod.startDate)} ${datePeriod.startDate.getDate()} - ${datePeriod.year}`;

            return {
                title,
                text: datePeriod.startDate.getDate().toLocaleString(),
                id: datePeriod.index
            };
        }
    }
}
