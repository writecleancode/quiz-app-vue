export type CountryType = {
	name: string;
	isGuessed: boolean;
};

export type DrivingLicenseQuestionDataType = {
	title: string;
	imageUrl: string;
	imageAlt: string;
	hasUserAnswered: boolean;
	answers: {
		text: string;
		isCorrectAnswer: boolean;
		hasUserChecked: boolean;
	}[];
};

export type KnowledgeOfMoviesQuestionDataType = {
	title: string;
	imageUrl: string;
	hasUserAnswered: boolean;
	answersData: {
		id: string;
		textFirstPart: string;
		textLastPart: string;
		correntAnswer: string;
		acceptableAnswers: string[];
		hasUserGuessed: boolean;
	}[];
};

export type RecognizeLogoQuestionDataType = {
	imageUrl: string;
	imageAlt: string;
	answers: {
		text: string;
		isCorrectAnswer: boolean;
	}[];
};
