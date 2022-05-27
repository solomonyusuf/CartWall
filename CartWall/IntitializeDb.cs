using CartWall.Models;
using Microsoft.AspNetCore.Identity;

namespace CartWall
{
    public class IntitializeDb
    {
            public static void SeedData
        (UserManager<ApplicationUser> userManager,
        RoleManager<Role> roleManager)
            {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }



            public static void SeedUsers
        (UserManager<ApplicationUser> userManager)
            {
            if (userManager.FindByNameAsync
                   ("user1").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "user1@localhost";
                user.Email = "user1@localhost";
                user.Role = "User";
                IdentityResult result = userManager.CreateAsync
                (user, "Solomon12!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }


            if (userManager.FindByNameAsync
                   ("solomon").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "olafire03@gmail.com";
                user.Email = "olafire03@gmail.com";
                user.EmailConfirmed = true;
                user.Role = "Admin";
                IdentityResult result = userManager.CreateAsync
                (user, "Solomon12!").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }



            public static void SeedRoles
        (RoleManager<Role> roleManager)
            {
            if (!roleManager.RoleExistsAsync
               ("User").Result)
            {
                Role role = new Role();
                role.Name = "User";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }


            if (!roleManager.RoleExistsAsync
                ("Admin").Result)
            {
                Role role = new Role();
                role.Name = "Admin";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

             if (!roleManager.RoleExistsAsync
                ("Manager").Result)
            {
                Role role = new Role();
                role.Name = "Manager";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
       
    }
}
