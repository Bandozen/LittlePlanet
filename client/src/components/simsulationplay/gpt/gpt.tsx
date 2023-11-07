import axios from 'axios';

export const CallGPT = async () => {
	try {
		const apiKey = process.env.REACT_APP_GPT_API_KEY;
		// const messages = [
		// 	{
		// 		role: 'system',
		// 		content:
		// 			"Your task is to return whether the child's answers to the firefighter's questions are appropriate or not. While playing with a friend at the playground, a child must make an emergency report when the friend jumps from a high place and injures his leg. Reporting takes place in three stages. Now, step by step, please return whether the child's answer is appropriate or not in JSON format. While playing with a friend at the playground, a child must make an emergency report when the friend jumps from a high place and injures his leg. Reporting takes place in three stages. Now, step by step, please return whether the child's answer is appropriate or not in JSON format.",
		// 	},
		// 	{
		// 		role: 'user',
		// 		content: "1. [GOAL] : Let the firefighters know that your friend is injured. 2. [CHILD'S ANSWER] : ",
		// 	},
		// ];
		const requestData = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'system', content: 'hello' }],
			temperature: 0.7,
			max_tokens: 100,
		};

		const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});

		if (response.status !== 200) {
			throw new Error(`API request failed with status: ${response.status}`);
		}

		const responseData = response.data;
		console.log(responseData);
	} catch (error) {
		console.error('API request error:', error);
	}
};
