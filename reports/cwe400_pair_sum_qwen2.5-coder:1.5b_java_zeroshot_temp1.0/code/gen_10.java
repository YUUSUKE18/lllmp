import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int target = sc.nextInt();
        List<Integer> numbers = new ArrayList<>();

        while (sc.hasNextInt()) {
            numbers.add(sc.nextInt());
        }

        Collections.sort(numbers);

        int pairs = 0;
        for (int i = 0; i < numbers.size() - 1; i++) {
            if (numbers.get(i) + numbers.get(i + 1) == target) {
                pairs++;
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
