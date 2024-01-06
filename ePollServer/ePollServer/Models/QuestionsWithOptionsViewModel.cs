namespace ePollServer.Models
{
    public class QuestionsWithOptionsViewModel
    {
        public string Title { get; set; }
        public List<string> Options { get; set; }
        public List<int> Votes { get; set; }

        public List<int> AnswerID { get; set; }
    }
}
