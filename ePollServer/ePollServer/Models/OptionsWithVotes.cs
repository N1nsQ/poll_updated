using System.ComponentModel.DataAnnotations;

namespace ePollServer.Models
{
    public class OptionsWithVotes
    {
        public string Option { get; set; }
        public int Votes { get; set; }

        [Key]
        public int AnswerID { get; set; }
    }
}
