#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <pthread.h>

pthread_t *threads;
int count;

void my_handler(int s) {
    int i;

    for(i = 0; i < count; i++)
        pthread_detach(threads[i]);

    free(threads);

    exit(1);
};

void *thread_main(void *);

int main(int argc, char **argv)
{
	int i;
	int status;
    struct sigaction sigIntHandler;

    if (argc != 2) {
        printf("Usage: <count>\n");
        return 1;
    }

    sigIntHandler.sa_handler = my_handler;
    sigemptyset(&sigIntHandler.sa_mask);
    sigIntHandler.sa_flags = 0;

    sigaction(SIGINT, &sigIntHandler, NULL);

    count = atoi(argv[1]);
    threads = (pthread_t*)malloc(sizeof(pthread_t) * count);

	for (i = 0; i < count; i++)
	{	
		pthread_create(&threads[i], NULL, &thread_main, (void *)&i);
	}
    
	for (i = 0; i < count; i++)
	{
	    pthread_join(threads[i], (void **)&status);
	}

    free(threads);

	return 0;
}

void *thread_main(void *arg)
{
    system("node dist/client.js");

	pthread_exit((void *) 0);
}