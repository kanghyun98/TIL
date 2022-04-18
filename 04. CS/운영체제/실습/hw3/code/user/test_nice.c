#include "types.h"
#include "stat.h"
#include "user.h"


void test_nice()
{
    int pid, nice;
    
    printf(1, "case 1. get nice value of init process: ");
        if (getnice(1) == 5)  
            printf(1, "OK\n");
        else
            printf(1, "WRONG\n");

        printf(1, "case 2. get nice value of non-existing process: ");
        if (getnice(100) == -1) 
            printf(1, "OK\n");
        else
            printf(1, "WRONG\n");

        printf(1, "case 3. set nice value of current process: ");
        pid = getpid();
        setnice(pid, 3); 
        if (getnice(pid) == 3)  
            printf(1, "OK\n");
        else
            printf(1, "WRONG\n");

        printf(1, "case 4. set nice value of non-existing process: ");
        if (setnice(100, 3) == -1) 
            printf(1, "OK\n");
        else
            printf(1, "WRONG\n");

        printf(1, "case 5. set wrong nice value of current process: ");
        if (setnice(pid, -1) == -1 && setnice(pid, 31) == -1) 
            printf(1, "OK\n");
        else
            printf(1, "WRONG\n");
    
        printf(1, "case 6. get nice value of forked process: ");
        nice = getnice(pid);

        pid = fork();
        
        if (pid == 0) { //child
            if (getnice(getpid()) == nice) { 
                printf(1, "OK\n");
                exit();
            }   
            else {
                printf(1, "WRONG\n");
                exit();
            }   
        }   
        else                        //parent
            wait();
}

int main(int argc, char **argv)
{
        printf(1, "=== TEST START ===\n");
        test_nice();
        printf(1, "=== TEST   END ===\n");

        exit();
}

