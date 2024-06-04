import * as React from 'react';

interface Props {
    time: string;
}

const TimeDifference: React.FC<Props> = (props) => {
    const { time } = props;
    const givenTimestamp = time;

    const calculateTimeDifference = (timestamp: string) => {
        const givenDate = new Date(timestamp);
        const currentDate = new Date();

        const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime();

        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        const differenceInDays = Math.floor(differenceInHours / 24);

        if (differenceInHours === 0) {
            const remainingMinutes = differenceInMinutes % 60;
            if (remainingMinutes === 0) {
                const remainingSeconds = differenceInSeconds % 60;
                return { differenceInDays, differenceInHours, remainingMinutes, remainingSeconds };
            }
            return { differenceInDays, differenceInHours, remainingMinutes };
        }

        return { differenceInDays, differenceInHours };
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const { differenceInDays, differenceInHours, remainingMinutes, remainingSeconds } = calculateTimeDifference(givenTimestamp);

    const formattedGivenDate = formatDate(new Date(givenTimestamp));
    let timeDifferenceString = '';
    if (differenceInDays > 0) {
        timeDifferenceString = `${differenceInDays} day${differenceInDays > 1 ? 's' : ''}`;
    } else if (differenceInHours > 0) {
        timeDifferenceString = `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''}`;
        if (remainingMinutes) {
            timeDifferenceString += ` ${remainingMinutes} min`;
        }
    } else {
        timeDifferenceString = `${remainingMinutes} min`;
        if (remainingSeconds) {
            timeDifferenceString += ` ${remainingSeconds} sec`;
        }
    }

    return (
        <div>
            <p>{formattedGivenDate} {timeDifferenceString}</p>
        </div>
    );
};

export default TimeDifference;
