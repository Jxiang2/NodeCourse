interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: Date;
    destination: string;
    customers: string[];
    upcoming: boolean;
    success: boolean;
}

interface LaunchInput {
    mission: string;
    rocket: string;
    launchDate: Date;
    destination: string;
}

export {
    Launch,
    LaunchInput
};