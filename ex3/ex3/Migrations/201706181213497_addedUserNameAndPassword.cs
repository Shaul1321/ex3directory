namespace ex3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedUserNameAndPassword : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "UserName", c => c.String(nullable: false));
            AddColumn("dbo.Users", "EncryptedPassword", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "EncryptedPassword");
            DropColumn("dbo.Users", "UserName");
        }
    }
}
