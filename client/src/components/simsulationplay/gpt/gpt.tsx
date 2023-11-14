import axios from 'axios';

export const CallGPT = async (prompt: object) => {
	try {
		const apiKey = process.env.REACT_APP_GPT_API_KEY;
		const messages = [
			{
				role: 'system',
				content:
					"Your task is to return whether the child's answers to the firefighter's questions are appropriate or not. While playing with a friend at the playground, a child must make an emergency report when the friend jumps from a high place and injures his leg. Reporting takes place in four stages. Now, step by step, please return whether the child's answer is appropriate or not in JSON format. While playing with a friend at the playground, a child must make an emergency report when the friend jumps from a high place and injures his leg. Reporting takes place in three stages. Now, step by step, please return whether the child's answer is appropriate or not in JSON format.",
			},
			{
				role: 'user',
				content:
					"1. [GOAL] : Let the firefighters know that your friend is injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : 친구가 다쳤어요. ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'user',
				content:
					"1. [GOAL] : Let the firefighters know that your friend is injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : 강아지가 다쳤어요. ## Use the output in the following JSON format. { success : false ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'user',
				content:
					"1. [GOAL] : Child must convey their current location (삼성스토어 소행성 지점 or 소행성로 203) to the firefighters. 2. [FIREFIGHTER'S QUESTION] : 친구가 있는 위치를 말해주세요. 3. [CHILD'S ANSWER] : 소행성로 203이에요. ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'user',
				content:
					"1. [GOAL] : Child must convey their current location (삼성스토어 소행성 지점 or 소행성로 203) to the firefighters. 2. [FIREFIGHTER'S QUESTION] : 친구가 있는 위치를 말해주세요. 3. [CHILD'S ANSWER] : 삼성스토어 소행성지점이에요. ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'user',
				content:
					"1. [GOAL] : Child must explain to the firefighters where their friend was injured. 2. [FIREFIGHTER'S QUESTION] : 친구가 어디를 다쳤나요? 3. [CHILD'S ANSWER] : 다리에서 피가 많이 나요. ## Use the output in the following JSON format. { success : true ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			{
				role: 'user',
				content:
					"1. [GOAL] : Child must explain to the firefighters where their friend was injured. 2. [FIREFIGHTER'S QUESTION] : 친구가 어디를 다쳤나요? 3. [CHILD'S ANSWER] : 머리에서 피가 많이 나요. ## Use the output in the following JSON format. { success : false ( boolean, whether the child's answer is appropriate or not)} ##",
			},
			prompt,
		];

		const requestData = {
			model: 'gpt-3.5-turbo-0613',
			messages,
			max_tokens: 100,
		};

		const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
		});

		const lastMessage = response.data.choices[0].message.content;
		const parsedMessage = JSON.parse(lastMessage);
		console.log(lastMessage);
		console.log(parsedMessage);

		return parsedMessage.success;
	} catch (error) {
		return error;
	}
};
