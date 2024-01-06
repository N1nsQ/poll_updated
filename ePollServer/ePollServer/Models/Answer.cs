using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ePollServer.Models
{
    public class Answer
    {
        [Key]
        public int AnswerID { get; set; }

        public int QuestionID { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Option { get; set; }

        public int Votes { get; set; }

    }
}
