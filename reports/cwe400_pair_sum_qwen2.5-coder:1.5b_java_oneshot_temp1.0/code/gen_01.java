import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Scanner sc = new Scanner(System.in);
        int goal = sc.nextInt();
        int count = 0;
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        while (sc.hasNext()) {
            int num = sc.nextInt();
            if (num == 0) {
                if (count == 2) break;
                count = 0;
                max = Integer.MIN_VALUE;
                min = Integer.MAX_VALUE;
            } else if (num > max) {
                max = num;
                count = 1;
            } else if (num < min) {
                min = num;
                count = 1;
            } else {
                count++;
            }
        }
        if (count == 2 && max - min == goal) {
            System.out.println("pairs=2");
        } else if (count == 1 && max == goal) {
            System.out.println("pairs=1");
        } else {
            System.out.println("pairs=0");
        }
        sc.close();
    }
}
