import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int target = scanner.nextInt();
        scanner.nextLine();

        int count = 0;
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < target; i++) {
            int num = scanner.nextInt();
            if (seen.contains(target - num)) {
                count++;
            }
            seen.add(num);
        }

        System.out.println("pairs=" + count);
    }
}
