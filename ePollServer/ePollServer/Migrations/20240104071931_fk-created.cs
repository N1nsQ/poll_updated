using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ePollServer.Migrations
{
    /// <inheritdoc />
    public partial class fkcreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionID",
                table: "Answers",
                column: "QuestionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionID",
                table: "Answers",
                column: "QuestionID",
                principalTable: "Questions",
                principalColumn: "QuestionID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionID",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_QuestionID",
                table: "Answers");
        }
    }
}
