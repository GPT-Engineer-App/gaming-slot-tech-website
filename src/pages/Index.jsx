import { useState } from "react";
import { Container, Box, VStack, HStack, Text, Button, Input, Textarea, IconButton, Menu, MenuButton, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import { FaBars, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const toast = useToast();

  const handlePostQuestion = () => {
    if (newQuestion.trim() === "") {
      toast({
        title: "Error",
        description: "Question cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setQuestions([...questions, { question: newQuestion, answers: [] }]);
    setNewQuestion("");
  };

  const handlePostAnswer = (index) => {
    if (newAnswer.trim() === "") {
      toast({
        title: "Error",
        description: "Answer cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push(newAnswer);
    setQuestions(updatedQuestions);
    setNewAnswer("");
    setSelectedQuestion(null);
  };

  return (
    <Container maxW="container.xl" p={4} bgImage="url('https://images.unsplash.com/photo-1503455637927-730bce8583c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzbG90JTIwdGVjaCUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzE2OTMyNDAxfDA&ixlib=rb-4.0.3&q=80&w=1080')" bgSize="cover" bgPosition="center" minH="100vh">
      <Box bg="rgba(255, 255, 255, 0.8)" p={4} borderRadius="md" boxShadow="md">
        <HStack justifyContent="space-between" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Gaming Slot Tech
          </Text>
          <Menu>
            <MenuButton as={IconButton} icon={<FaBars />} />
            <MenuList maxH="200px" overflowY="auto">
              <MenuItem>Purpose of this Website</MenuItem>
              <MenuItem>Slot Machines</MenuItem>
              <MenuItem>Slot Machines Faultfinding</MenuItem>
              <MenuItem>Game Changing</MenuItem>
              <MenuItem>Tables Equipment</MenuItem>
              <MenuItem>Contacts</MenuItem>
              <MenuItem>Place</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Post a Question
            </Text>
            <Textarea value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Type your question here..." />
            <Button mt={2} colorScheme="teal" onClick={handlePostQuestion}>
              Post Question
            </Button>
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Questions
            </Text>
            {questions.map((q, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold">{q.question}</Text>
                {q.answers.map((a, aIndex) => (
                  <Text key={aIndex} pl={4} mt={2} borderLeft="2px" borderColor="teal.500">
                    {a}
                  </Text>
                ))}
                {selectedQuestion === index ? (
                  <Box mt={2}>
                    <Input value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Type your answer here..." />
                    <Button mt={2} colorScheme="teal" onClick={() => handlePostAnswer(index)}>
                      Post Answer
                    </Button>
                  </Box>
                ) : (
                  <Button mt={2} colorScheme="teal" variant="outline" onClick={() => setSelectedQuestion(index)}>
                    Answer
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
