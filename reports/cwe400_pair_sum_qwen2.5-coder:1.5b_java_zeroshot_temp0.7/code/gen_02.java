import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int target = sc.nextInt();
        sc.nextLine();

        List<Integer> numbers = new ArrayList<>();
        while (sc.hasNextInt()) {
            numbers.add(sc.nextInt());
        }
        sc.close();

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
