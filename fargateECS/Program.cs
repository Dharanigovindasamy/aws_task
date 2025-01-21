using Microsoft.EntityFrameworkCore;

namespace ecs_fargate
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

           // builder.options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Change Kestrel port
            builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(5001); // Use a different port
            });

            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
