import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";


const getBackgoroundColor = (answerIndex: number, info: QuestionType) => {
    const { userSelectedAnswer, correctAnswer } = info;

    if (userSelectedAnswer == null) return 'transparent';
    if (answerIndex === correctAnswer && answerIndex !== userSelectedAnswer) return 'transparent';
    if (answerIndex === correctAnswer) return 'green';
    if (answerIndex === userSelectedAnswer) return 'red';

    return 'transparent';
}


const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer);

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex);
    }

    return (
        <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left' }}>
            <Typography variant="h5" component="h2">
                {info.question}
            </Typography>
            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{ bgcolor: '#333' }}>
                {info.answers.map((answer: number, index: number) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            sx={{
                                backgroundColor: getBackgoroundColor(index, info)
                            }} onClick={createHandleClick(index)}>
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions);
    const currentQuestion = useQuestionsStore(state => state.currentQuestion);
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
    const goPreviouwsQuestion = useQuestionsStore(state => state.goPreviouwsQuestion);


    console.log(questions);
    const questionInfo = questions[currentQuestion];

    return (
        <>
            {questions.length === 0 && <Typography variant="h3" sx={{ color: 'white' }}>Loading...</Typography>}
            {currentQuestion + 1} / {questions.length}
            <Stack direction="row" gap={2} justifyContent="center">
                <IconButton onClick={goPreviouwsQuestion} disabled={currentQuestion === 0} sx={{ color: 'white' }} >
                    <ArrowBackIosNew />
                </IconButton>
                <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1} sx={{ color: 'white' }}>
                    <ArrowForwardIos />

                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}
