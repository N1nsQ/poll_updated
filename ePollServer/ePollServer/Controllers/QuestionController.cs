using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ePollServer.Models;

namespace ePollServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly PollDbContext _context;

        public QuestionController(PollDbContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions
                .Include(q => q.Answers)
                .ToListAsync();
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.QuestionID == id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        [HttpGet("optionsForQuestion/{questionID}")]
        public ActionResult<QuestionsWithOptionsViewModel> GetOptions(int questionID)
        {
            var question = _context.Questions.Find(questionID);

            if (question == null)
            {
                return NotFound();
            }

            var optionsWithVotes = _context.Answers
                .Where(answer => answer.QuestionID == questionID)
                .GroupBy(answer => answer.Option)  // Group by option to get distinct options
                .Select(group => new OptionsWithVotes
                {
                    Option = group.Key,
                    Votes = group.Sum(answer => answer.Votes),
                    AnswerID = group.First().AnswerID
                })
                .ToList();

            var result = new QuestionsWithOptionsViewModel
            {
                Title = question.Title,
                Options = optionsWithVotes.Select(option => option.Option).ToList(),
                Votes = optionsWithVotes.Select(option => option.Votes).ToList(),
                AnswerID = optionsWithVotes.Select(option => option.AnswerID).ToList()
            };

            return result;
        }


        [HttpPost("createQuestionWithOptions")]
        public ActionResult CreateQuestionWithOptions([FromBody] QuestionsWithOptionsViewModel request)
        {
            if (request == null || string.IsNullOrEmpty(request.Title) || request.Options == null || request.Options.Count == 0)
            {
                return BadRequest("Invalid request. Title and options are required.");
            }

            var newQuestion = new Question
            {
                Title = request.Title
                
            };

            _context.Questions.Add(newQuestion);
            _context.SaveChanges();

            
            var newQuestionID = newQuestion.QuestionID;
            foreach (var option in request.Options)
            {
                var newAnswer = new Answer
                {
                    QuestionID = newQuestionID,
                    Option = option,
                    Votes = 0
                    
                };
                _context.Answers.Add(newAnswer);
            }

            _context.SaveChanges();

            return Ok("Question with options created successfully.");
        }

        // PUT: api/Question/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QuestionID)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Question
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.QuestionID }, question);
        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.QuestionID == id);
        }
    }
}
