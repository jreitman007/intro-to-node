import csv from "csv-parser"
import fs from "fs"
interface ClueItem {
    Category: string
    Clue: string
    Answer: string
    GeneralSubject: string
    SpecificSubject: string
    "General Subject"?: string
    "Specific Subject"?: string
    Correct: string | boolean
    Value: string | number
    Level: string | number
    Date: any
}

enum Category {
    SIX_PACK = 'Six Pack'
}


async function main() {
    const CLUES: ClueItem[] = [];
    const data = fs.createReadStream("Jeopardy - Sheet1.tsv")
        .pipe(csv({ separator: "\t"}))
        .on("data", (data) => CLUES.push(data))
        .on("end", () => {
            
            
            const formattedData = CLUES.map((newClue) => {
                newClue.Date = new Date(newClue.Date);
                newClue.Correct = newClue.Correct === "True" ? true : false;
                newClue.GeneralSubject = newClue["General Subject"] ?? "";
                newClue.SpecificSubject = newClue["Specific Subject"] ?? "";
                newClue.Level = Number(newClue.Level)
                newClue.Value = Number(newClue.Value)

                delete newClue["Specific Subject"]
                delete newClue["General Subject"]


                return {
                    ...newClue
                }
            })

            console.log(formattedData)
        })


    
}


main()



// @ts-ignore
// ^ the line above ignores all typescript errors for anything DIRECTLY below it

