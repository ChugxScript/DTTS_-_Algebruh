isProblem = checkCurrentProblem()
answer = checkAnswer()
answerTime = checkAnswerTime()

if isProblem == "Difficult":
    
    if answerTime <= "3 seconds":

        if answer == "wrong":
            # wrong answer,
            # answer time is less than 3sec
            # problem is difficult,
            
            conclusion = "NANG HULA kase mahirap ang problem"
            promptText = "alam kong mahirap ang problem pero wag mo naman hulaan"

            # next move
            moveA = [
                70% - Warning 
                15% - bonus
                10% - easy problem
                5% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                # nang hula kase mahirap kaya mataas ang bonus at easy prob
                moveB = [
                    60% - bonus 
                    30% - easy prob
                    10% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        70% - easy prob 
                        30% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    70% - easy prob
                    30% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion

        else:
            # correct answer
            # but answer time is less than 3sec
            # problem is difficult
            
            conclusion = "TAMA ang HULA HAHAHAHA"
            promptText = "you F*cking LUCKY nang hula ka lang naman >:("

            # next move
            moveA = [
                70% - Warning 
                5% - bonus
                10% - easy problem
                10% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                # nang hula pero tama kaya mababa ang bonus
                moveB = [
                    10% - bonus 
                    40% - easy prob
                    50% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        20% - easy prob 
                        80% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    20% - easy prob
                    80% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion
    
    else:
        
        if answer == "wrong":
            # wrong answer,
            # answer time is more than 3sec
            # problem is difficult,
            
            conclusion = "nag isip kaso mali parin sagot"
            promptText = "okay lang yan. keep trying."

            # next move
            moveA = [
                15% - Warning 
                50% - bonus
                20% - easy problem
                15% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                moveB = [
                    50% - bonus 
                    30% - easy prob
                    20% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        80% - easy prob 
                        20% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    80% - easy prob
                    20% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion
        
        else:
            # correct answer
            # answer time is more than 3sec
            # problem is difficult
            
            conclusion = "nag compute at tama ang sagot"
            promptText = "you F*cking GENIUS! :o"

            # next move
            moveA = [
                15% - Warning 
                15% - bonus
                20% - easy problem
                50% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                moveB = [
                    20% - bonus 
                    50% - easy prob
                    30% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        20% - easy prob 
                        80% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    20% - easy prob
                    80% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion

else:
    
    if answerTime <= "3 seconds":

        if answer == "wrong":
            # wrong answer,
            # answer time is less than 3sec
            # problem is easy,
            
            # madali lang naman problem, sinugatan nang wala pa 3 sec tas mali pa
            conclusion = "NANG HULA kase tinatamad"
            promptText = "wag mo hulaan! madali lang ang problem"

            # next move
            moveA = [
                70% - Warning 
                10% - bonus
                10% - easy problem
                10% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                moveB = [
                    30% - bonus 
                    30% - easy prob
                    40% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        50% - easy prob 
                        50% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    50% - easy prob
                    50% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion
        
        else:
            # correct answer
            # but answer time is less than 3sec
            # problem is easy
            
            conclusion = "BASIC PROBLEM kahit kinder kayang sagutan"
            promptText = "O diba BASIC!"

            # next move
            moveA = [
                15% - Warning 
                5% - bonus
                20% - easy problem
                60% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                moveB = [
                    5% - bonus 
                    35% - easy prob
                    60% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        30% - easy prob 
                        70% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    30% - easy prob
                    70% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion
    
    else:
        
        if answer == "wrong":
            # wrong answer,
            # answer time is more than 3sec
            # problem is easy,
            
            conclusion = "nag isip kaso mali parin sagot"
            promptText = "idunno what to say. even a baby can answer it but you guess it wrong."

            # next move
            moveA = [
                15% - Warning 
                60% - bonus
                20% - easy problem
                5% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                moveB = [
                    60% - bonus 
                    35% - easy prob
                    5% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        70% - easy prob 
                        30% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    70% - easy prob
                    30% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion
        
        else:
            # correct answer
            # answer time is more than 3sec
            # problem is easy
            
            conclusion = "nag compute at tama ang sagot pero madali lang ang tanong"
            promptText = "okay! now do it faster!"

            # next move
            moveA = [
                15% - Warning 
                25% - bonus
                50% - easy problem
                10% - difficult problem
            ]

            if moveA != warning or moveA != bonus:
                nextQuestion = moveA
                return nextQuestion

            elif moveA == warning:
                print(promptText)
                
                moveB = [
                    60% - bonus 
                    35% - easy prob
                    5% - difficult prob
                ]

                if moveB == bonus:
                    nextQuestion = [
                        70% - easy prob 
                        30% - difficult prob
                    ]
                else:
                    nextQuestion = moveB
                
                return nextQuestion

            elif moveA == bonus:
                moveB = [
                    70% - easy prob
                    30% - difficult prob
                ]
                nextQuestion = moveB
                return nextQuestion

            else:
                nextQuestion = moveA
                return nextQuestion


# import random

# def get_next_question(answer, answer_time, problem_difficulty):
#     conclusion = ""
#     prompt_text = ""
#     next_question = None
    
#     if problem_difficulty == "Difficult":
#         if answer_time <= 3:
#             if answer == "wrong":
#                 conclusion = "NANG HULA kase mahirap ang problem"
#                 prompt_text = "alam kong mahirap ang problem pero wag mo naman hulaan"
#                 next_question = select_next_question("difficult", answer)
#             else:
#                 conclusion = "TAMA ang HULA HAHAHAHA"
#                 prompt_text = "you F*cking LUCKY nang hula ka lang naman >:("
#                 next_question = select_next_question("difficult", answer)
#         else:
#             if answer == "wrong":
#                 conclusion = "nag isip kaso mali parin sagot"
#                 prompt_text = "okay lang yan. keep trying."
#                 next_question = select_next_question("difficult", answer)
#             else:
#                 conclusion = "nag compute at tama ang sagot"
#                 prompt_text = "you F*cking GENIUS! :o"
#                 next_question = select_next_question("difficult", answer)
#     else:
#         if answer_time <= 3:
#             if answer == "wrong":
#                 conclusion = "NANG HULA kase tinatamad"
#                 prompt_text = "wag mo hulaan! madali lang ang problem"
#                 next_question = select_next_question("easy", answer)
#             else:
#                 conclusion = "BASIC PROBLEM kahit kinder kayang sagutan"
#                 prompt_text = "O diba BASIC!"
#                 next_question = select_next_question("easy", answer)
#         else:
#             if answer == "wrong":
#                 conclusion = "nag isip kaso mali parin sagot"
#                 prompt_text = "idunno what to say. even a baby can answer it but you guess it wrong."
#                 next_question = select_next_question("easy", answer)
#             else:
#                 conclusion = "nag compute at tama ang sagot pero madali lang ang tanong"
#                 prompt_text = "okay! now do it faster!"
#                 next_question = select_next_question("easy", answer)
    
#     print(conclusion)
#     if prompt_text:
#         print(prompt_text)
    
#     return next_question

# def select_next_question(difficulty, answer):
#     warning_bonus = 15 if answer == "wrong" else 5
#     bonus_probability = 50 if answer == "wrong" else 60
    
#     if difficulty == "difficult":
#         move_weights = {
#             "Warning": 70 - warning_bonus,
#             "Bonus": bonus_probability,
#             "Easy Problem": 10,
#             "Difficult Problem": 100 - (70 + bonus_probability + 10)
#         }
#     else:
#         move_weights = {
#             "Warning": 70 - warning_bonus,
#             "Bonus": bonus_probability,
#             "Easy Problem": 20,
#             "Difficult Problem": 100 - (70 + bonus_probability + 20)
#         }
    
#     moves = list(move_weights.keys())
#     probabilities = [move_weights[move] for move in moves]
#     selected_move = random.choices(moves, weights=probabilities)[0]
    
#     if selected_move == "Warning":
#         print(prompt_text)
#         return select_next_question(difficulty, answer)
#     elif selected_move == "Bonus":
#         return select_next_question(difficulty, "correct")
#     elif selected_move == "Easy Problem":
#         return selected_move
#     elif selected_move == "Difficult Problem":
#         return selected_move

# # Example usage:
# prompt_text = "init"
# problem_difficulty = "Difficult"
# answer = "wrong"
# answer_time = 2
# next_question = get_next_question(answer, answer_time, problem_difficulty)
# print("Next question:", next_question)
